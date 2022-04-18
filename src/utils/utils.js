import axios from "axios";

export const BASE_URL = `http://localhost:8080/games?name=`;

export const fetchGamesByNameContain = async () => {
    try {
        return await axios.get(`${BASE_URL}crazy`);
    } catch (e) {
        return [];
    }
};

describe("fetchGamesByNameContain", () => {
    describe("when API call is succesfull", () => {
        it("should return users list", async () => {
            //given
            const data = [
                {id: 1, name: "crazy taxi"},
            ];
            axios.get.mockResolvedValueOnce(data);
            //when
            const result = await fetchGamesByNameContain();

            //then
            expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}crazy`);
            expect(result).toEqual(data);
        });
    });

    describe("when API call fails", () => {
        it("should return empty list", async () => {
            //given
            const message = "Network Error";
            axios.get.mockRejectedValueOnce(new Error(message));

            //when
            const result = await fetchGamesByNameContain();

            //then
            expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}crazy`);
            expect(result).toEqual([]);

        });
    });
});



