import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import CodingTestDto from "../../../../data/dto/CodingTestDto.ts";
import { ResponseEntity } from "../../../../data/ResponseEntity.ts";
import { Card } from "primereact/card";
import httpFetcher from "../../../../lib/httpFetcher.ts";
import AceEditor from "react-ace";
import "brace/mode/java";
import "brace/mode/python";
import "brace/mode/c_cpp.js";
import "brace/mode/golang.js";
import "brace/theme/github";
import "brace/theme/monokai.js";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useCallback, useState } from "react";
import Constants from "../../../../utils/Constants.ts";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import "../../style.css";
import CodingTestCodeFooter from "../components/CodingTestCodeFooter.tsx";
import {ContentDto} from "../../../../data/dto/ContentDto.ts";

const CodingTestPage = () => {
    const { id } = useParams();
    const [selectLanguage, setLanguage] = useState(Constants.provideLanguage[0]);
    const [code, setCode] = useState(Constants.javaSnippet);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { isLoading, data, isError, error } = useQuery({
        queryKey: ["v1", "content", id],
        queryFn: httpFetcher<ResponseEntity<ContentDto>>,
    });

    const onChangeCode = useCallback((value) => {
        setCode(value);
    }, []);

    const onChangeLanguageSelect = useCallback((e: DropdownChangeEvent) => {
        const selectedLang = e.target.value;
        setLanguage(selectedLang);
        if (selectedLang.name === "Python") {
            setCode(Constants.pythonSnippet);
        } else if (selectedLang.name === "Java") {
            setCode(Constants.javaSnippet);
        } else if (selectedLang.name === "GO") {
            setCode(Constants.goSnippet);
        } else if (selectedLang.name === "C") {
            setCode(Constants.cSnippet);
        } else if (selectedLang.name === "C++") {
            setCode(Constants.cppSnippet);
        } else {
            setCode(""); // 선택되지 않았거나 스니펫이 없을 경우 기본값
        }
    }, []);

    if (isError) {
        return <>{error}</>;
    }

    if (!data || !data.data) {
        return <>nodata</>;
    }

    return (
        <>
            <Card header={<div className={"text-2xl p-4"}>{data.data.studyName}</div>} />
            <div className={"flex w-full mt-2 mr-2"}>
                <Card className={"flex-[2] flex flex-col p-2"}>
                    <div className={"text-start text-xl font-bold"}>문제</div>
                    <p className={"text-start mt-1"}>{data.data.codingTest?.description}</p>
                    <Divider />
                    <div className={"text-start text-xl font-bold"}>입력</div>
                    <p className={"text-start mt-1"}>{data.data.codingTest?.input}</p>
                    <Divider />
                    <div className={"text-start text-xl font-bold"}>출력</div>
                    <p className={"text-start mt-1"}>{data.data.codingTest?.output}</p>
                    <Divider />
                    <div className={"text-start text-lg mb-1"}>예시 입력</div>
                    <pre className={"text-start bg-black rounded-lg text-white p-4"}>
            {data.data.codingTest?.inputTestCase[0]}
          </pre>
                    <div className={"text-start text-lg mb-1"}>예시 출력</div>
                    <pre className={"text-start bg-black rounded-lg text-white p-4"}>
            {data.data.codingTest?.outputTestCase[0]}
          </pre>
                </Card>
                <Card
                    className={"flex-[3] p-2 ml-2"}
                    header={<div className={"text-lg"}>코드</div>}
                    footer={
                        <CodingTestCodeFooter
                            hint={data.data.codingTest?.hint!}
                            code={code}
                            language={selectLanguage.name}
                        />
                    }
                >
                    <div className={"text-right mb-2"}>
                        <Dropdown
                            value={selectLanguage}
                            options={Constants.provideLanguage}
                            optionLabel={"name"}
                            onChange={onChangeLanguageSelect}
                        />
                    </div>
                    <div className={"pb-2"}>
                        <AceEditor
                            width={"100%"}
                            mode={selectLanguage.mode}
                            theme="monokai"
                            fontSize={15}
                            value={code}
                            onChange={onChangeCode}
                            name="UNIQUE_ID_OF_DIV"
                            editorProps={{ $blockScrolling: true }}
                        />
                    </div>
                </Card>
            </div>
        </>
    );
};

export default CodingTestPage;
