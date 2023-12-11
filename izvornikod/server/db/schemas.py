from marshmallow import Schema, fields


class UserSchema(Schema):
    userid = fields.Int()
    firstname = fields.Str()
    lastname = fields.Str()
    email = fields.Str()
    role = fields.Str()
    passwordchanged = fields.Bool()
