import axios from 'axios';
import qs from 'qs';

export type ReportType = {
    url: string,
    reportMessage?: string,
};

export default async function getReports(skip: number): Promise<ReportType[]> {
    const { data } = await axios({
        method: 'GET',
        url: 'https://complaint-pump.herokuapp.com/urls',
        params: qs.stringify({ skip }),
    });

    return data;
}
