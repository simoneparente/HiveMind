INSERT INTO h.utente(email, username, password)
VALUES ('mario@gmail.com', 'mario', 'mario'),
       ('giovanni@gmail.com', 'giovanni', 'giovanni'),
       ('marco@gmail.com', 'marco', 'marco');


INSERT INTO h.idea(id_utente, titolo, descrizione, dataora)
VALUES (1, 'provaidea1', 'uscire per causare', '2019-01-01 00:00:00'),
       (2, 'provaidea2', 'uscire per causardwde', '2019-01-02 00:00:00'),
       (3, 'provaidea3', 'uscire per causare', '2019-01-04 00:00:00');


INSERT INTO h.voto(id_utente, id_idea, tipo) VALUES (2, 1, 'upvote'), (3, 1, 'upvote');


INSERT INTO h.ins_Idea(Username, Titolo, Descrizione, DataOra)
    VALUES('mario', 'proviamo', 'ciaone', NOW());
