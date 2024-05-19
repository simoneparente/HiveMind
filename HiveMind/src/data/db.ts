import postgres from 'postgres'

const sql = postgres('postgres://postgres:1234@localhost:5432/postgres', {
  host                 : 'localhost',            // Postgres ip address[s] or domain name[s]
  port                 : 5432,          // Postgres server port[s]
  database             : '',            // Name of database to connect to
  username             : 'postgres',            // Username of database user
  password             : '1234',            // Password of database user
})


export default sql