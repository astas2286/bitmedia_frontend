import React from "react"
import DataComponent from './DataComponent';
import { AppShell } from "@mantine/core";

const FooterComponent = () => {
    return (
        <AppShell.Footer align="center" >
            <DataComponent />
        </AppShell.Footer>
    )
}
export default FooterComponent