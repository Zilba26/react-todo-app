import { extendTheme } from "@chakra-ui/react"

const theme = {
    config: {
        initialColorMode: "system",
        useSystemColorMode: true,
    },
    styles: {
        global: {
            "*": {
                margin: 0,
                padding: 0,
                boxSizing: "border-box",
            },
        },
    }
}

export default extendTheme(theme)