def test_create_and_get_word(login_admin, client, revert_create_word):
    croatianname = revert_create_word

    create_word_input = {
        "croatianname": croatianname,
        "foreignname": "Test foreign name",
        "audiopath": "Dummy audio path",
    }

    resp = client.post("api/words/1", json=create_word_input)

    assert resp.status_code == 200
    assert resp.json["croatianname"] == croatianname
    assert resp.json["foreignname"] == "Test foreign name"
    assert resp.json["audiopath"] == "Dummy audio path"
    assert resp.json["languageid"] == 1


def test_start_study_session_unavailable(
    login_student, study_session_setup_teardown, client
):
    dictionaryid, wordid = study_session_setup_teardown

    resp = client.get(f"/api/words/choice/{dictionaryid}/{wordid}")

    assert resp.status_code == 403
