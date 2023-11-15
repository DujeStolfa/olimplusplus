import ULOGA from "../enums/Uloga";

interface Korisnik {
  korisnikid: number;
  ime: string;
  prezime: string;
  email: string;
  uloga: ULOGA;
  promijeniolozinku: boolean;
}

export default Korisnik;