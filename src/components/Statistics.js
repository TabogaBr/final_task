import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { API_URL } from '../constants';
import _ from 'lodash';

export default function Statistics() {

    const [groupedTrainings, setGroupedTrainings] = useState([]);

    useEffect(() => {
        fetch(API_URL + 'gettrainings')
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    alert('Something went wrong in GET request');
            })
            .then(data => {
                let trainings = [];
                trainings = data.map(training => ({
                    name: training.activity,
                    totalDuration: training.duration
                }));
                const groupedTrainings = _.groupBy(trainings, 'name');
                const summedTrainings = _.map(groupedTrainings, (trainings, name) => ({
                    name: name,
                    totalDuration: _.sumBy(trainings, 'totalDuration')
                }));
                setGroupedTrainings(summedTrainings);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <BarChart width={1000} height={400} data={groupedTrainings} style={{ marginTop: '150px' }}>
                <Bar dataKey="totalDuration" fill="#8884d8" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Total Duration (min)', angle: -90, position: 'insideLeft' }} interval="preserveStartEnd" />
                <Tooltip />
                <Legend />
            </BarChart>
        </div>
    );
}
