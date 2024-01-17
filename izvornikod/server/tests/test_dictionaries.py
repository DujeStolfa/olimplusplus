def test_create_dictionary_unauthorised(client):
    create_dict_input = {"dictionaryname": "Test rjecnik"}

    with client:
        resp = client.post("/api/dictionaries/1", json=create_dict_input)

        assert resp.status_code == 401


def test_create_dictionary_empty_name(login_admin, client):
    create_dict_input = {"dictionaryname": ""}

    resp = client.post("/api/dictionaries/1", json=create_dict_input)

    assert resp.status_code == 403
