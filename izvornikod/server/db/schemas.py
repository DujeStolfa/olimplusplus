from marshmallow import Schema, fields


class KorisnikSchema(Schema):
    korisnikid = fields.Int()
    ime = fields.Str()
    prezime = fields.Str()
    email = fields.Str()
    uloga = fields.Str()
    promijeniolozinku = fields.Bool()
