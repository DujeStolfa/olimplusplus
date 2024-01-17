import Phrase from "../../models/Phrase";

interface CreateWordInput {
    croatianname: string;
    foreignname: string;
    phrases: Phrase[];
    audiopath: string;
    languageid: number;
}

export default CreateWordInput;