import styled from "styled-components";
import { FormControl, FormControlProps } from "react-bootstrap";

export interface ContainerProps extends FormControlProps {}

export const Container = styled(FormControl)<ContainerProps>``;
