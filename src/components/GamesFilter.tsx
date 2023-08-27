import { FC, useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setFilter } from '../store/reducers/filterSlice';
import { Button, Input, Popover, Radio, Select, Tag } from 'antd';


const tags = ["mmorpg", "shooter", "strategy", "moba", "racing", "sports", "social", "sandbox", "open-world", "survival", "pvp", "pve", "pixel", "voxel", "zombie", "turn-based", "first-person", "third-Person", "top-down", "tank", "space", "sailing", "side-scroller", "superhero", "permadeath", "card", "battle-royale", "mmo", "mmofps", "mmotps", "3d", "2d", "anime", "fantasy", "sci-fi", "fighting", "action-rpg", "action", "military", "martial-arts", "flight", "low-spec", "tower-defense", "horror", "mmorts"]

const GamesFilter: FC = () => {
    const filter = useAppSelector(state => state.filter);
    const dispatch = useAppDispatch();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("")

    function handleTagChange(tag: string, checked: boolean) {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter(t => t !== tag);
        setSelectedTags(nextSelectedTags);
    }
    const filteredTags = useMemo(() => search ? [...tags].filter(tag => tag.includes(search)) : tags, [search])

    useEffect(() => {
        dispatch(setFilter({ key: 'tag', value: selectedTags.join(".") }))
    }, [selectedTags])


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
            <Popover
                open={open}
                title={"Теги"}
                trigger={"click"}
                onOpenChange={click => setOpen(click)}
                overlayStyle={{ width: "250px", height: "300px", overflowY: "scroll", boxShadow: "0px 5px 10px 1px gray" }}
                content={
                    <>
                    <Input value={search} onChange={e => setSearch(e.target.value)} style={{marginBottom:"10px"}} placeholder='Поиск'/>
                    {filteredTags.map(tag => (
                        <Tag.CheckableTag
                            key={tag}
                            checked={selectedTags.includes(tag)}
                            onChange={checked => handleTagChange(tag, checked)}
                        >
                            {tag}
                        </Tag.CheckableTag>
                    ))}
                    </>
                }
            >
                <Button>Тэги</Button>
            </Popover>
        </div>
    );
};

export default GamesFilter;
