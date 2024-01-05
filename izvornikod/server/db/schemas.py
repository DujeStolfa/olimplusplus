from marshmallow import Schema, fields


class UserSchema(Schema):
    userid = fields.Int()
    firstname = fields.Str()
    lastname = fields.Str()
    email = fields.Str()
    role = fields.Str()
    passwordchanged = fields.Bool()
    usercreatedat = fields.DateTime()


class DictionarySchema(Schema):
    dictionaryid = fields.Int()
    dictionaryname = fields.Str()
    dictionarycreatedat = fields.DateTime()
    languageid = fields.Int(load_only=True)


class DictionaryWordStateSchema(Schema):
    dictionaryid = fields.Int()
    dictionaryname = fields.Str()
    total_word_count = fields.Int()
    unfinished_word_count = fields.Int()
    available_word_count = fields.Int()


class WordSchema(Schema):
    wordid = fields.Int()
    croatianname = fields.Str()
    foreignname = fields.Str()
    audiopath = fields.Str()
    languageid = fields.Int(load_only=True)
