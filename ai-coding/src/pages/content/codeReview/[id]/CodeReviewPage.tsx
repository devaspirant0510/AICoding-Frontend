import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import httpFetcher from "../../../../lib/httpFetcher.ts";
import {ResponseEntity} from "../../../../data/ResponseEntity.ts";
import {CodeReviewDto} from "../../../../data/dto/CodeReviewDto.ts";
import {Card} from "primereact/card";
import AceEditor from "react-ace";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {materialDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {ContentDto} from "../../../../data/dto/ContentDto.ts";
import {TabMenu} from "primereact/tabmenu";
import {useState} from "react";
import BackButton from "../../../../components/atom/BackButton.tsx";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import Markdown from "react-markdown";

const items = [
    {
        label: 'Code',
        icon: 'pi pi-code'
    },
    {
        label: "Review",
        icon: 'pi pi-comment'
    }
]

const CodeReviewPage = () => {
    const {id} = useParams();
    const {isLoading, data, isError, error} = useQuery({
        queryKey: ['v1', 'codeReview', id],
        queryFn: httpFetcher<ResponseEntity<ContentDto>>
    })

    const [active, setActive] = useState(0)
    if (isLoading) {
        return (
            <>
                loading
            </>
        )
    }
    if (isError) {
        return <>{error}</>
    }
    if (!data) {
        return <>nodata</>
    }
    return (
        <div>
            <Card className={'mb-4'}>
                <div className={'flex justify-between items-center px-4 py-4'}>
                    <BackButton/>
                    <div className={'text-2xl'}>{data.data.studyName}</div>
                    <i className={'pi pi-ellipsis-v'}></i>
                </div>
            </Card>
            <Card className="flex flex-col p-4" style={{height: '100%'}} footer={
                <div className={'mt-2 flex justify-end'}>
                    <Link to={"/home"}><Button >홈으로</Button></Link>
                </div>}>
                <div>
                    <TabMenu model={items} activeIndex={active} onTabChange={(e) => setActive(e.index)}/>
                </div>
                {active === 0 ?
                    <div className="flex-1" style={{display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
                        <div style={{flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column'}}>
                            <SyntaxHighlighter
                                customStyle={{
                                    margin: 0, // 기본 여백 제거
                                    padding: 4, // 기본 여백 제거
                                    flex: 1,
                                    width: '100%',
                                    height: '100%',
                                    overflow: 'auto',
                                }}
                                language={data?.data.category.toLowerCase()}
                                style={materialDark}
                            >
                                {data.data?.codeReview?.code!}
                            </SyntaxHighlighter>
                        </div>
                    </div> :
                    <div className="flex-1" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        minHeight: '60vh',
                        background: 'var(--cowhite)'
                    }}>
                        <div style={{
                            paddingTop: '4px',
                            flex: 1,
                            overflow: 'auto',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                        <Markdown className={'text-start m-2'}>
                        {data.data.codeReview?.review!}
                        </Markdown>
                        </div>
                    </div>
                }
            </Card>

        </div>
    )
}
export default CodeReviewPage;
