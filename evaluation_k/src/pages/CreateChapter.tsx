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
  InputNumber
} from "rsuite";
import { Chapter } from "../models/api/Chapters";
import { Fields } from "../models/api/Fields";
import { Levels } from "../models/api/Levels";
import { string } from "prop-types";

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
}

export const CreateChapter = () => {
  const host = process.env.REACT_APP_BASEURL;
  const history = useHistory()
  const { id, field_id, level_id } = useParams<ChapterParams>()
  const [chapter, setChapter] = useState<Chapter>(defaultChapter);

    console.log('prevState chapter:', chapter);    
    
    let handleSubmit = async () => {
        
        //TODO: Check why setChapter does follow async rule, update occurs on 2nd try
        const nId = Number(id)
        const nField_id = Number(field_id)
        const nLevel_id = Number(level_id)
        if(id !== undefined){
            setChapter({...chapter, chapter_id: nId, field_id: 1, level_id: 1})
            console.log('chapter if id :',chapter)
        } else if (field_id && level_id !== undefined ) {
            setChapter({...chapter, field_id: nField_id, level_id: nLevel_id});
            console.log('chapter if field and level', chapter);
        }
        
        await axios.post(`${host}/v1/chapters/`, 
            {
                chapter
            }
        )
        .then((response => {
            if(response.status === 201) {
                history.push(`/chapitres/${response.data.id}`)
            } else if ( response.status === 400 ){
                console.log('Error 400');
            }
        }))

        .catch((err) => {
            console.log(err);
        })
    
  };

  return (
    <Container>
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
              onChange={value => {
                  var n = Number(value);
                  setChapter({...chapter, number: n})
                  console.log('numéro', n);
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
                  setChapter({...chapter, name: value})
                // setNameChapter(value);
                console.log("Name :", value);
              }}
            />
          </FormGroup>
          {/* <FormGroup>
            <ControlLabel> Chapitre parent </ControlLabel>
            <InputPicker
              data={[]}
              style={{ width: 224 }}
              appearance="default"
              placeholder="chapitre parent"
            />
          </FormGroup> */}
          {/* <FormGroup>
            <ControlLabel> Matière </ControlLabel>
            <SelectPicker
              searchable={false}
              data={fields}
              labelKey="name"
              valueKey="id"
              style={{ width: 224 }}
              appearance="default"
              placeholder="aucun"
              onSelect={value => {
                  setChapter({...chapter, field_id: value})
                  console.log('matière :', value);
                  
              }}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel> Niveau </ControlLabel>
            <SelectPicker
              searchable={false}
              labelKey="name"
              valueKey="id"
              data={levels}
              style={{ width: 224 }}
              appearance="default"
              placeholder="aucun"
              onSelect={value => {
                  setChapter({...chapter, level_id: value})
                  console.log('niveau :', value);
              }}
            />
          </FormGroup> */}
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
