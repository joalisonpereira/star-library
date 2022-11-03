import { Modal, ModalProps } from "react-bootstrap";
import styled from "styled-components";

export interface ContainerProps extends ModalProps {}

export const Container = styled(Modal)<ContainerProps>``;
