import axios from 'axios';
import {fetchGameByNameContain} from '../pages/GamesByName.js';

jest.mock('axios');

describe("fetchGameByNameContain", ()=> {
    describe("when API call is successful", ()=> {
        it("should return users list", async () => {
            //given
            const games = [
                {
                    id: 7,
                    name: "crazy taxi",
                    system: "dreamcast",
                    developer: "hitmaker",
                    uploader_id: 2,
                    uploader_name: "user",
                    price: 40.00
                }
            ];
            axios.get.mockResolvedValueOnce(games);

            //when
            const result = await fetchGameByNameContain();

            //then
            expect(axios.get).toHaveBeenCalledWith(`http://localhost:8080/games?name=crazy`);
            expect(result).toEqual(games);
        });
    });

    describe('When API call fails', () => {
        it("should return empty users list", async () => {
            //given
            const message = "Network error";
            axios.get.mockRejectedValueOnce(new Error(message));

            //when
            const result = await fetchGameByNameContain();

            //then
            expect(axios.get).toHaveBeenCalledWith(`http://localhost:8080/games?name=crazy`);
            expect(result).toEqual([]);
        });
    });
});