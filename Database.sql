DROP SCHEMA IF EXISTS h CASCADE;

CREATE SCHEMA IF NOT EXISTS h ;


CREATE TABLE IF NOT EXISTS h.Utente(
    ID_Utente SERIAL,
    Username  VARCHAR(50) NOT NULL,
    Email     VARCHAR(50) NOT NULL,
    Password  VARCHAR(50) NOT NULL,

    CONSTRAINT PK_Utente PRIMARY KEY(ID_Utente),
    CONSTRAINT UN_Email UNIQUE(Email),
    CONSTRAINT UN_Username UNIQUE(Username)
);

CREATE TABLE IF NOT EXISTS h.Idea(
    ID_Idea SERIAL,
    ID_Utente INTEGER NOT NULL,
    Titolo   VARCHAR(50) NOT NULL,
    Descrizione VARCHAR(400) NOT NULL,
    DataOra TIMESTAMP NOT NULL,

    CONSTRAINT PK_Idea PRIMARY KEY(ID_Idea),
    CONSTRAINT FK_Idea_Utente FOREIGN KEY(ID_Utente) REFERENCES h.Utente(ID_Utente)
);

CREATE TABLE IF NOT EXISTS h.Voto(
    ID_Utente INTEGER NOT NULL,
    ID_Idea INTEGER NOT NULL,
    Tipo VARCHAR(32) NOT NULL,

    CONSTRAINT PK_Voto PRIMARY KEY(ID_Utente, ID_Idea),
    CONSTRAINT FK_Voto_Utente FOREIGN KEY(ID_Utente) REFERENCES h.Utente(ID_Utente),
    CONSTRAINT FK_Voto_Idea FOREIGN KEY(ID_Idea) REFERENCES h.Idea(ID_Idea)
);

CREATE TABLE IF NOT EXISTS h.Commento(
    ID_Commento SERIAL,
    ID_Utente INTEGER,
    ID_Idea INTEGER,
    Testo VARCHAR(400) NOT NULL,
    DataOra TIMESTAMP NOT NULL,

    CONSTRAINT PK_Commento PRIMARY KEY(ID_Commento),
    CONSTRAINT FK_Commento_Utente FOREIGN KEY(ID_Utente) REFERENCES h.Utente(ID_Utente),
    CONSTRAINT FK_Commento_Idea FOREIGN KEY(ID_Idea) REFERENCES h.Idea(ID_Idea)
);

------------------------------------------------------------------------------------------------------------------------

CREATE FUNCTION h.countSaldoVoti(ID_IdeaIn INTEGER) RETURNS INTEGER AS $$
    DECLARE
        saldo INTEGER = 0;
        cursoreVoti CURSOR FOR SELECT tipo
                               FROM h.Voto AS V
                               WHERE V.id_idea = ID_IdeaIn  ;
    BEGIN
        FOR voto IN cursoreVoti LOOP
            IF voto.tipo = 'upvote' THEN
                saldo = saldo + 1;
            ELSEIF voto.tipo = 'downvote' THEN
                saldo = saldo - 1;
            END IF;
        END LOOP;
        RETURN saldo;
    END;
    $$ LANGUAGE plpgsql;


--View di appoggio per creare la vista IdeaUtenteVotiNewest
CREATE OR REPLACE VIEW h.IdeaUtente AS
    SELECT I.ID_Idea,
           U.username as Creatore,
           I.titolo AS Titolo,
           I.descrizione as Descrizione,
           I.dataora AS DataOra
    FROM h.Idea AS I JOIN h.Utente AS U
         ON I.ID_Utente = U.ID_Utente;

-- Vista che restituisce le idee ordinate dalla più recente
CREATE VIEW h.IdeaUtenteVotiNewest AS
    SELECT IU.ID_Idea,
           IU.Creatore,
           IU.Titolo,
           IU.Descrizione,
           IU.DataOra,
           h.countSaldoVoti(IU.ID_Idea) AS SaldoVoti
    FROM h.IdeaUtente AS IU
    ORDER BY IU.DataOra DESC;

--View per inserir nuove idee
CREATE VIEW h.ins_Idea AS
    SELECT U.username AS Username, I.titolo as Titolo, I.descrizione AS Descrizione, I.dataora as DataOra
    FROM h.Idea AS I, h.Utente AS U;

CREATE OR REPLACE FUNCTION h.insIdea() RETURNS TRIGGER AS $$
    DECLARE
        userID INTEGER = (SELECT ID_Utente
                             FROM h.Utente
                             WHERE username = NEW.username);
    BEGIN
        INSERT INTO h.Idea(ID_Utente, Titolo, Descrizione, DataOra)
        VALUES(userID, NEW.Titolo, NEW.Descrizione, NEW.DataOra);
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

CREATE TRIGGER ins_Idea
    INSTEAD OF INSERT ON h.ins_Idea
    FOR EACH ROW
    EXECUTE FUNCTION h.insIdea();

