import Uloga from "../enums/Role";

interface Korisnik {
  korisnikid: number;
  ime: string;
  prezime: string;
  email: string;
  uloga: Uloga;
  promijeniolozinku: boolean;
}

export default Korisnik;