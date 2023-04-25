import Link from "next/link";
import styled from "styled-components";
import { todoCardStyle } from "./cssStyles";

export const LinkAsDiv = styled(Link)`
    ${todoCardStyle}
    `;