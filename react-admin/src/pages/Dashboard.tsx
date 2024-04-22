import { useEffect } from 'react'
import Wrapper from '../components/Wrapper.component'
import * as c3 from 'c3'
import axios from 'axios'

type dataType = {
    Date: string;
    sum: string;
}

const Dashboard = () => {

    useEffect(() => {
        (
            async () => {
                const chart = c3.generate({
                    bindto: '#chart',
                    data: {
                        x: 'x',
                        columns: [
                            ['x'],
                            ['Sales'],
                        ],
                        types: {
                            Sales: 'bar'
                        }
                    },
                    axis: {
                        x: {
                            type: 'timeseries',
                            tick: {
                                format: '%d/%m/%y'
                            }
                        }
                    }
                })

                const {data} = await axios.get('chart')
                chart.load({
                    columns: [
                        ['x', ...data.map((r: dataType) => r.Date)],
                        ['Sales', ...data.map((r: dataType) => r.sum)]
                    ]
                })
            }
        )()
    }, [])

    return (
        <Wrapper>
            <h2>Daily Sales</h2>
            <div id="chart" />
        </Wrapper>
    )
}

export default Dashboard