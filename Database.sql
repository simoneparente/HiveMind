DROP SCHEMA IF EXISTS h CASCADE;

CREATE SCHEMA h;


CREATE TABLE h.Utente(
    ID_Utente SERIAL,
    Username  VARCHAR(50) NOT NULL,
    Email     VARCHAR(50) NOT NULL,
    Password  VARCHAR(50) NOT NULL,

    CONSTRAINT PK_Utente PRIMARY KEY(ID_Utente),
    CONSTRAINT UN_Email UNIQUE(Email),
    CONSTRAINT UN_Username UNIQUE(Username)
);

CREATE TABLE h.Idea(
    ID_Idea SERIAL,
    ID_Utente INTEGER,
    Titolo   VARCHAR(50) NOT NULL,
    Descrizione VARCHAR(400) NOT NULL,
    DataOra TIMESTAMP NOT NULL,

    CONSTRAINT PK_Idea PRIMARY KEY(ID_Idea),
    CONSTRAINT FK_Idea_Utente FOREIGN KEY(ID_Utente) REFERENCES h.Utente(ID_Utente)
);

CREATE TABLE h.Voto(
    ID_Utente INTEGER NOT NULL,
    ID_Idea INTEGER NOT NULL,
    Tipo VARCHAR(32) NOT NULL,

    CONSTRAINT PK_Voto PRIMARY KEY(ID_Utente, ID_Idea),
    CONSTRAINT FK_Voto_Utente FOREIGN KEY(ID_Utente) REFERENCES h.Utente(ID_Utente),
    CONSTRAINT FK_Voto_Idea FOREIGN KEY(ID_Idea) REFERENCES h.Idea(ID_Idea)
);

CREATE TABLE h.Commento(
    ID_Commento SERIAL,
    ID_Utente INTEGER,
    ID_Idea INTEGER,
    Testo VARCHAR(400) NOT NULL,
    DataOra TIMESTAMP NOT NULL,

    CONSTRAINT PK_Commento PRIMARY KEY(ID_Commento),
    CONSTRAINT FK_Commento_Utente FOREIGN KEY(ID_Utente) REFERENCES h.Utente(ID_Utente),
    CONSTRAINT FK_Commento_Idea FOREIGN KEY(ID_Idea) REFERENCES h.Idea(ID_Idea)
);

-- Un utente non può votare la propria idea
CREATE FUNCTION h.checkUserIsNotAuthor() RETURNS TRIGGER AS $$
    BEGIN
        IF NEW.ID_Utente = (SELECT ID_Utente FROM h.Idea WHERE ID_Idea = NEW.ID_Idea) THEN
            RAISE EXCEPTION 'L''utente non può votare la propria idea';
        END IF;
        RETURN NEW;
    END;
    $$
    LANGUAGE plpgsql;

CREATE TRIGGER T_Voto_checkUserIsNotAuthor
    BEFORE INSERT ON h.Voto
    EXECUTE FUNCTION h.checkUserIsNotAuthor();

------------------------------------------------------------------------------------------------------------------------

