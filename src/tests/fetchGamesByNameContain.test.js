import axios from "axios";
import {fetchGamesByNameContain} from "../utils/utils";

test("fetchGameByNameContain", async () => {
    //arrange
    const fetchGamesbyNameContainMock = jest.fn();
    fetchGamesbyNameContainMock.mockReturnValue([{id: 1,
        name: "crazy taxi"
    }]);

    //act
    const result = await fetchGamesbyNameContainMock();

    //assert
    expect(result).toStrictEqual([{
        id: 1, name: "crazy taxi"
    }]);
});

test("fetchGameByNameContain without results", async ()=> {
    //arrange
    const fetchGamesByNameContainMock = jest.fn();
    fetchGamesByNameContainMock.mockReturnValue([]);

    //act
    const result = await fetchGamesByNameContainMock();

    //assert
    expect(result).toStrictEqual([]);
});