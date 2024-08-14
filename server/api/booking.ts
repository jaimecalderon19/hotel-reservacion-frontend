
export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    return {
        booking: {
            name: body.name || "",
            cellphone: body.cellphone || "",
            payment: body.payment || ""
        }
    }
})
