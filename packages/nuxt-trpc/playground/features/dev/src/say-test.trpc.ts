export async function sayTest() {
    const meta = {
        client: import.meta.client,
    }
    const result = JSON.stringify(meta)
    return result
}

export default defineTRPCProcedure((p) => p
    .input(() => {})
    .mutation(() => sayTest as unknown as string),
)
