import axios from "axios";
import {fetchGamesByNameContain} from "../utils/utils";

test("fetchGameByNameContain", async () => {
    //arrange

    //act
    const result = await fetchGamesByNameContain();

    //assert
    expect(result).toBe([{
        id: 1, name: "crazy taxi"
    }]);
});

test("fetchGameByNameContain without results", async ()=> {
    //arrange

    //act
    const result = await fetchGamesByNameContain();

    //assert
    expect(result).toStrictEqual([]);
});