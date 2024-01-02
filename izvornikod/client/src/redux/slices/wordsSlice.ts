/**
import CreateWordInput from "../../types/inputs/user/CreateWordInput"; 

const createWord = createAsyncThunk(
    'auth/createWordStatus',
    async (data: CreateWordInput) => {
    const response = await usersService.createWord(data, data.languageId);
    return response.data;
    }
);

 */
export {}