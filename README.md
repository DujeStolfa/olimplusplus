olimplusplus
=====

Projektni zadatak na kolegiju Programsko inženjerstvo: **FlipMemo** (G17.4)

**Prva revizija** aplikacije dostupna je na adresi https://olimplusplus-frontend.onrender.com/login

Dostupne putanje su:
- [/login](https://olimplusplus-frontend.onrender.com/login) i [/register](https://olimplusplus-frontend.onrender.com/register)
- [/student-info](https://olimplusplus-frontend.onrender.com/student-info) - pristup dozvoljen samo učenicima
- [/admin-info](https://olimplusplus-frontend.onrender.com/student-info) - pristup dozvoljen samo administratorima

U aplikaciju se možete prijaviti sa sljedećim podacima:
| Ime   | Prezime | Email              | Lozinka  | Uloga         |
|-------|---------|--------------------|----------|---------------|
| Nikša | Brala   | niksa.brala@fer.hr | niksa123 | Administrator |
| Nina  | Bulić   | nina.bulic@fer.hr  | nina123  | Administrator |
| Karlo | Kuzle   | karlo.kuzle@fer.hr | karlo123 | Učenik        |
| Ivo   | Žilić   | ivo.zilic@fer.hr   | ivo123   | Učenik        |



Dev - postavljanje razvojnog okruženja
======

Za lokalno pokretanje aplikacije trebate imati instaliran:
- Python 3
- PostgreSQL
- Node.js

## Server

Pri prvom pokretanju backenda potrebno je:
1. Stvoriti novo [virtualno okruženje](https://docs.python.org/3/tutorial/venv.html) i aktivirati ga 
```console
izvornikod/server> python -m venv .venv
izvornikod/server> .venv\Scripts\activate
```

2. Instalirati vanjske pakete iz `requirements.txt` datoteke
```console
(.venv) izvornikod/server> pip install -r requirements.txt
```

3. Stvoriti bazu podataka (PgAdmina ili ručno) i nazvati ju `flipmemo`

4. Stvoriti `.env` datoteku u `server` direktoriju i popuniti je
	- U ovu datoteku spremamo varijable okruženja koje su nam potrebne za pokretanje backenda
	- Takve datoteke najčešće sadrže povjerljive informacije i ne želimo ih pushati na git
	- `SECRET_KEY` varijablu koristi Flask za uspostavljanje i praćenje korisničkih sesija, možete je generirati pokretanjem naredbe `python -c 'import secrets; print(secrets.token_hex())'` u terminalu
	- `SQLALCHEMY_DATABASE_URI_DEV` poveznica je na lokalno stvorenu bazu podataka. Potrebno je upisati korisničko ime i lozinku korisnika koji se spaja na bazu. Ako niste stvarali dodatne korisnike u bazi `CREATE USER` naredbom, korisničko ime će biti `postgres`, a lozinka će biti ona koju unosite u PgAdmin.
	- Konačna datoteka trebala bi izgledati ovako:
```env
SECRET_KEY="<GENERIRANI STRING>"
SQLALCHEMY_DATABASE_URI_DEV="postgresql://postgres:<VAŠA LOZINKA>@localhost:5432/flipmemo"
```

5. Dodati tablice u bazu
	- Za upravljanje migracijama u bazi podataka koristimo [Flask-Migrate](https://flask-migrate.readthedocs.io/en/latest/) koji nam služi kao sučelje za pristup Alembicu i olakšava nam njegovo korištenje
	- Datoteke s migracijama uključuju se u _version control_ pa ih ne trebate ručno stvarati, trebate samo nadograditi bazu na najnoviju migraciju:
```console
(.venv) izvornikod/server> flask --app server.py db upgrade
```

Ako ste sve dobro postavili, trebali biste moći pokrenuti backend:
```console
(.venv) izvornikod/server> flask --app server.py run --debug
 * Serving Flask app '.\server.py'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: <...>
```

U svakom sljedećem pokretanju potrebno je samo aktivirati stvoreno virtualno okruženje pozivanjem `venv\Scripts\activate` skripte (na MacOS i Linux sustavima ta bi se skripta trebala nalaziti u `venv/bin` direktoriju).

## Client

Postavljanje frontenda svodi se na stvaranje `node_modules` foldera iz `package.json` i `package-lock.json` datoteka. Pokrenite `npm install` naredbu iz `izvornikod\client` direktorija, i pričekajte da se svi potrebni moduli instaliraju. 

Frontend pokrećete `npm start` naredbom.