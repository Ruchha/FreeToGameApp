import {FC} from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setFilter } from '../store/reducers/filterSlice';
import { Radio, Select } from 'antd';

const GamesFilter: FC = () => {
    const filter = useAppSelector(state => state.filter)
    const dispatch = useAppDispatch()
    console.log(filter)
    return (
        <div>
            <Radio.Group value={filter.platform} onChange={e => dispatch(setFilter({key: 'platform', value: e.target.value}))}>
                <Radio value="pc">PC</Radio>
                <Radio value="browser">Browser</Radio>
                <Radio value="all">All</Radio>
            </Radio.Group>
            <Select
            onChange={value => dispatch(setFilter({key:"sort-by", value}))}
            defaultValue={filter['sort-by'] || ""}
            options={[
                {value: "", label:"Сортировать по"},
                {value: "alphabetical", label:"Алфавиту"},
                {value: "release-date", label:"Дате выхода"},
                {value: "popularity", label:"Популярности"},
            ]}
            />
            
        </div>
);
};

export default GamesFilter