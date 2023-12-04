# olimplusplus

Projektni zadatak na kolegiju Programsko inženjerstvo: **FlipMemo** (G17.4)

Dev - postavljanje razvojnog okruženja
======

Za pokretanje aplikacije trebate imati instaliran:
- Python 3
- PostgreSQL
- Node.js

U razvoju će vam dobro doći i:
- Postman

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

3. Stvoriti bazu podataka (pgAdmin ili ručno) i nazvati ju `flipmemo`

4. Stvoriti `.env` datoteku u `server` direktoriju i popuniti je
	- U ovu datoteku spremamo varijable okruženja koje su nam potrebne za pokretanje backenda
	- Takve datoteke najčešće sadrže povjerljive informacije i ne želimo ih pushati na git
	- `SECRET_KEY` varijablu koristi Flask za uspostavljanje i praćenje korisničkih sesija, možete je generirati pokretanjem naredbe `python -c 'import secrets; print(secrets.token_hex())'` u terminalu
	- `SQLALCHEMY_DATABASE_URI_DEV` poveznica je na lokalno stvorenu bazu podataka. Potrebno je upisati korisničko ime i lozinku korisnika koji se spaja na bazu. Ako niste stvarali dodatne korisnike u bazi `CREATE USER` naredbom, korisničko ime će biti `postgres`, a lozinka će biti ona koju unosite u pgAdmin.
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

U svakom sljedećem pokretanju potrebno je samo aktivirati stvoreno virtualno okruženje pozivanjem `.venv\Scripts\activate` skripte (na MacOS i Linux sustavima ta bi se skripta trebala nalaziti u `.venv/bin` direktoriju).

### Provjerite radi li backend kako bi trebao

Stvorite novog korisnika i prijavite se kao on.

Naš backend je [HTTP REST API](https://ferhr-my.sharepoint.com/:b:/g/personal/ds54097_fer_hr/EeCVCI_zbApNj5exOE34sbABHQ_XFVr5XVrPxl1Ml6nGEA?e=ZSEuMx) i pristupamo mu slanjem HTTP zahtjeva. Zasigurno već imate najdraži alat za slanje takvih zahtjeva i možete ga slobodno koristiti (ako ga nemate, preporučujem da instalirate Postman). Prefiks za sve endpointove na backendu (dok ga vrtite lokalno) bit će `http://127.0.0.1:5000/api`.

1. Novog korisnika možete stvoriti slanjem zahtjeva `POST` na endpoint `/auth/users`
	- **Važno!** U Postmanu podatke dodajete u tijelo zahtjeva u kartici `Body` u formatu `raw` i `JSON`
	- Taj endpoint u tijelu zahtjeva očekuje sve podatke koji su mu potrebni za stvaranje korisnika (proizvoljno ih ispunite)
```JSON
{
    "ime": "...", 
    "prezime": "...",
    "email": "...",
	"lozinka": "...",
	"uloga": "..."
}
```
2. U pgAdminu provjerite je li korisnik uspješno dodan u bazu

3. U aplikaciju se prijavljujete slanjem zahtjeva `[REDACTED]` s podacima `[REDACTED]` na endpoint `[REDACTED]` 
	- [Virujen u te (2001.) :)](https://media.giphy.com/media/tZCkL6BsL2AAo/giphy.gif)

4. Nakon uspješne prijave trebali biste u Postmanu vidjeti `session` kolačić za `localhost` domenu (gumb `Cookies` ispod `Send`)

Razmislite o ovih nekoliko pitanja dok radite prethodne korake:
- Stvaranje korisnika
	- Zašto je taj zahtjev trebao biti POST?
	- Kako znamo koje podatke endpoint očekuje dobiti?
	- [Kako smo još](https://flask.palletsprojects.com/en/3.0.x/quickstart/) mogli poslati podatke tom endpointu? Koja bi tada bila metoda zahtjeva? Bi li to u ovom slučaju imalo smisla tako implementirati?
	- Što se dogodi ako izostavimo neki od podataka? Ima li dobiveni HTTP odgovor smisla? Ako nema, možete li pronaći neki [informativniji odgovor](https://http.cat/)? Jesmo li u kodu taj slučaj eksplicitno obradili ili je on poslan automatski?
	- Kako pristupamo tijelu zahtjeva? Što smo napravili da bismo dobili pristup tom objektu?
	- Kojim naredbama smo stvorili i izvršili SQL `INSERT ... INTO ...` upit? Odakle nam pristup toj varijabli?
	- U tablicu u bazi dodane su vrijednosti koje nismo naveli u tijelu zahtjeva. Gdje smo definirali koje će biti vrijednosti tih stupaca? Koji dio aplikacije je odgovoran za generiranje tih vrijednosti?
- Prijava
	- Što ste dobili u HTTP odgovoru nakon uspješne prijave? Zašto? Gdje je u kodu definiran format tog odgovora? Koju smo knjižnicu pritom koristili?

## Client

Postavljanje frontenda svodi se na stvaranje foldera `node_modules` iz datoteka `package.json` i `package-lock.json`. Pokrenite naredbu `npm install` iz direktorija `izvornikod\client` i pričekajte da se svi potrebni moduli instaliraju. 

Frontend pokrećete naredbom `npm start`. 

Prijavite se u aplikaciju kao korisnik kojeg ste stvorili prilikom postavljanja backenda. Pokušajte pristupiti stranici kojoj taj korisnik ne smije pristupiti.

Proučite kod za prijavu na frontendu i razmislite o sljedećim pitanjima:
- Kako smo definirali što klik na gumb s atributom `type="submit"` radi?
	- Što on radi?
	- Koji smo [hook](https://react.dev/learn/state-a-components-memory#meet-your-first-hook) koristili u tijelu handlera? Iz koje smo ga knjižnice uzeli? Koju funkciju s njim pozivamo? Koji tip podatka prima funkcija koju pozivamo? Što ona radi?
- Gdje smo definirali HTTP zahtjev (metodu, endpoint i tijelo) kojeg šaljemo na backend? Koju knjižnicu smo koristili za to?
- U **cijeloj** aplikaciji postoje dva foldera `api`. Kako su oni povezani; jesu li slični? Zašto? Na koji od SOLID principa vas to podsjeća?
- Što radimo s primljenim odgovorom na login zahtjev? 
	- Koju smo knjižnicu pritom koristili?
	- Gdje smo točno definirali kojeg je tipa taj odgovor? U kojoj smo datoteci definirali taj tip? Kojem razredu na backendu odgovara taj tip?
