import React, {
  useState,
  CSSProperties,
  useEffect,
  FunctionComponent
} from "react";
import { UserGlobalState } from "../core/user";
import { useHistory, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Content,
  Button,
  Form,
  FormGroup,
  FormControl,
  InputPicker,
  ControlLabel,
  HelpBlock,
  ButtonToolbar,
  Input,
  SelectPicker,
  Header
} from "rsuite";
import { Chapter } from "../models/api/Chapters";
import { Fields } from "../models/api/Fields";
import { Levels } from "../models/api/Levels";
import { string, number } from "prop-types";

const headerStyles: CSSProperties = {
  display: "flex",
  marginLeft: 30,
  marginTop: 60,
  marginBottom: 50
};

const defaultChapter: Chapter = {
  id: null,
  field_id: null,
  level_id: null,
  chapter_id: null,
  name: "",
  number: null,
  created_at: new Date(),
  updated_at: new Date()
};

type ChapterParams = {
  id: string;
  field_id: string;
  level_id: string;
};

export const CreateChapter = () => {
  const host = process.env.REACT_APP_BASEURL;
  const history = useHistory();
  const { id, field_id, level_id } = useParams<ChapterParams>();
  const [chapter, setChapter] = useState<Chapter>(defaultChapter);   
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true)


  let handleSubmit = () => {
    {
      /*TODO: Check why setChapter does follow async rule, update occurs on 2nd try*/
    }
    const nId = Number(id);
    const nField_id = Number(field_id);
    const nLevel_id = Number(level_id);
    console.log("field_id", field_id, "nfield_id", nField_id);
    console.log("level_id", level_id, "nlevel_id", nLevel_id);
    if (id !== undefined) {
      setChapter({
        ...chapter, 
        chapter_id: nId, 
        field_id: 1, 
        level_id: 1 
      });
      setLoading(false)
      console.log("chapter if id :", chapter);
    } else if (field_id && level_id !== undefined) {
      setChapter({
        ...chapter,
        field_id: nField_id,
        level_id: nLevel_id
      });
      setLoading(false)
      console.log("chapter if field and level", chapter);
    }
  };

  useEffect(() => {
    console.log('chapter in useEffect', chapter);
    console.log('status loading : ', loading);
    
    if (loading === false) {
      axios
        .post(`${host}/v1/chapters/`, {
          chapter
        })
        .then(response => {
          if (response.status === 201) {
            history.push(`/chapitres/${response.data.id}`);
          } else if (response.status === 400) {
            console.log("Error 400");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [loading]);

  return (
    <Container>
      <Header>
        <img
          src={require("../assets/mymentor.jpeg").default}
          alt="mymentor"
          style={{
            maxWidth: 200,
            width: 150,
            marginLeft: 10
          }}
        />
      </Header>
      <Content style={headerStyles}>
        <h1> Créer un nouveau chapitre </h1>
      </Content>
      <Content
        style={{
          display: "flex",
          marginLeft: 20,
          marginRight: 20,
          padding: "11.4px 12px",
          border: "2px solid #eee"
        }}
      >
        <Form
          layout="horizontal"
          style={{
            marginLeft: 60
          }}
        >
          <FormGroup>
            <ControlLabel> Numéro </ControlLabel>
            <Input
              style={{
                width: 100
              }}
              type="number"
              onChange={value => {
                const n = Number(value);
                setChapter({ ...chapter, number: n });
                console.log("numéro", value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel> Nom </ControlLabel>
            <Input
              style={{
                width: 200
              }}
              onChange={value => {
                setChapter({ ...chapter, name: value });
                // setNameChapter(value);
                console.log("Name :", value);
              }}
            />
          </FormGroup>
          <Button
            appearance="primary"
            style={{
              width: 100,
              backgroundColor: "#0064FF",
              color: "#ffffff",
              marginLeft: 180
            }}
            onClick={handleSubmit}
          >
            {" "}
            Enregister{" "}
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CreateChapter;
