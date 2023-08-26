import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setFilter } from '../store/reducers/filterSlice';
import { Radio, Select } from 'antd';

const GamesFilter: FC = () => {
    const filter = useAppSelector(state => state.filter);
    const dispatch = useAppDispatch();

    return (
        <div style={{ padding: '20px', border: '1px solid #e8e8e8', borderRadius: '4px' }}>
            <h2>Соритровка/Фильтрация</h2>
            <Radio.Group value={filter.platform} onChange={e => dispatch(setFilter({ key: 'platform', value: e.target.value }))}>
                <Radio value="pc">Игры на компьютер</Radio>
                <Radio value="browser">Браузерные игры</Radio>
                <Radio value="all">Все</Radio>
            </Radio.Group>
            <Select
                style={{ marginTop: '10px' }}
                onChange={value => dispatch(setFilter({ key: 'sort-by', value }))}
                defaultValue={filter['sort-by'] || ""}
                options={[
                    { value: "", label: "Сортировать по" },
                    { value: "alphabetical", label: "Алфавиту" },
                    { value: "release-date", label: "Дате выхода" },
                    { value: "popularity", label: "Популярности" },
                ]}
            />
        </div>
    );
};

export default GamesFilter;
