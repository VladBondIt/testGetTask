"use strict"


async function fetchName() {

    const res = await fetch("http://localhost:3020/displayedName")

    const { displayedName } = await res.json()

    return await displayedName.value[0]

}

async function getFilledStores() {

    const res = await fetch("http://localhost:3020/stock")

    const { stocks } = await res.json()

    const filtredStores = Object.entries(stocks["34"]).reduce((acc, curr) => {

        if (Number(curr[1]) !== 0) {
            acc.push(curr)
            return acc
        }
        return acc;
    }, [])

    const filledStores = filtredStores.map((value) => value[0])

    const maxCount = Math.max(...filtredStores.map(arr => Number(arr[1])))

    const maxCountStores = filtredStores.filter((value) => Number(value[1]) === maxCount)

    return await { filledStores, maxCountStores };

}

async function getResult() {
    const { filledStores, maxCountStores } = await getFilledStores()
    const itemName = await fetchName()

    console.log({ itemName, filledStores, maxCountStores })
}

getResult()








