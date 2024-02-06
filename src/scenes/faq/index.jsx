import { Box, useTheme, Typography } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetials from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {tokens} from "../../theme";

const FAQ = () => {
const theme = useTheme();
const colors = tokens(theme.palette.mode);

    return (
    <Box m="20px">
        <Header title="FAQ" subtitle="Welcome to your FAQ" />

        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography color={colors.greenAccent[500]} variant="h5">
                    An Important Question
                </Typography>
            </AccordionSummary>
            <AccordionDetials>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
            </AccordionDetials>
        </Accordion>


        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography color={colors.greenAccent[500]} variant="h5">
                    An Important Question
                </Typography>
            </AccordionSummary>
            <AccordionDetials>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
            </AccordionDetials>
        </Accordion>

        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography color={colors.greenAccent[500]} variant="h5">
                    An Important Question
                </Typography>
            </AccordionSummary>
            <AccordionDetials>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
            </AccordionDetials>
        </Accordion>

        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography color={colors.greenAccent[500]} variant="h5">
                    An Important Question
                </Typography>
            </AccordionSummary>
            <AccordionDetials>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
            </AccordionDetials>
        </Accordion>
    </Box>
    );
};

export default FAQ;