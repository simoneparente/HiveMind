# Schema logico
---
- **Utente**: <u>ID_Utente</u>, Username, Email, Password
- **Idea**: <u>ID_Idea</u>, <i>ID_Utente</i>, Titolo, Descrizione, DataOra
	<i>ID_Utente</i> --> Utente(ID_Utente)
- **Voto**: <u><i>ID_Utente</i></u>, _<u>ID_Idea</u>, Tipo
	<i>ID_Utente</i> --> Utente(ID_Utente)
	<i>ID_Idea</i> --> Idea(ID_Idea)
- **Commento**: <i>ID_Utente</i>, <i>ID_Idea</i>, Testo, DataOra
	<i>ID_Utente</i> --> Utente(ID_Utente)
	<i>ID_Idea</i> --> Idea(ID_Idea)
