type CodingTestDto = {
    id: number | null;
    title: string;
    description: string;
    input: string;
    output: string;
    hint: string;
    inputTestCase: string[];
    outputTestCase: string[];
};

export default CodingTestDto;