import { FC, useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { removeFilter, setFilter } from '../store/reducers/filterSlice';
import { Button, Input, Layout, Popover, Radio, Select, Tag, Typography } from 'antd';
import { DeleteOutlined, TagsOutlined } from '@ant-design/icons';

const tags = ["mmorpg", "shooter", "strategy", "moba", "racing", "sports", "social", "sandbox", "open-world", "survival", "pvp", "pve", "pixel", "voxel", "zombie", "turn-based", "first-person", "third-Person", "top-down", "tank", "space", "sailing", "side-scroller", "superhero", "permadeath", "card", "battle-royale", "mmo", "mmofps", "mmotps", "3d", "2d", "anime", "fantasy", "sci-fi", "fighting", "action-rpg", "action", "military", "martial-arts", "flight", "low-spec", "tower-defense", "horror", "mmorts"]

const GamesFilter: FC = () => {
    const filter = useAppSelector(state => state.filter);
    const dispatch = useAppDispatch();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [tagsSearch, setTagsSearch] = useState<string>('');

    const handleTagChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter(t => t !== tag);
        setSelectedTags(nextSelectedTags)
    };
    const clearFilter = () => {
        setSelectedTags([])
        dispatch(removeFilter())
    }
    const filteredTags = useMemo(() => tagsSearch ? [...tags].filter(tag => tag.toLowerCase().includes(tagsSearch.toLowerCase())) : tags, [tagsSearch])

    useEffect(() => {
        dispatch(setFilter({ key: 'tag', value: selectedTags.join(".") }))
    }, [selectedTags])

    return (
        <Layout.Content style={{ marginLeft: "50px", marginTop: "20px" }}>
            <Typography.Title level={3} style={{ marginBottom: '20px' }}>Сортировка/Фильтрация {(filter.category || filter['sort-by'] || filter.tag) && <Button onClick={clearFilter} icon={<DeleteOutlined />}>Отчистить фильтр</Button>}</Typography.Title>
            <Radio.Group
                style={{ marginBottom: '20px' }}
                value={filter.platform}
                onChange={e => dispatch(setFilter({ key: 'platform', value: e.target.value }))}
            >
                <Radio value="all">Все</Radio>
                <Radio value="pc">Игры на компьютер</Radio>
                <Radio value="browser">Браузерные игры</Radio>

            </Radio.Group>
            <Select
                style={{ width: '150px', marginBottom: '20px' }}
                onChange={value => dispatch(setFilter({ key: 'sort-by', value }))}
                value={filter['sort-by']}
                options={[
                    { value: '', label: 'Сортировать по' },
                    { value: 'alphabetical', label: 'Алфавиту' },
                    { value: 'release-date', label: 'Дате выхода' },
                    { value: 'popularity', label: 'Популярности' },
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
                        <Input value={tagsSearch} onChange={e => setTagsSearch(e.target.value)} style={{ marginBottom: "10px" }} placeholder='Поиск' />
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
                <Button icon={<TagsOutlined />} style={{ marginLeft: "10px" }}>Теги</Button>
            </Popover>
            {selectedTags.length > 0 && (
                <Typography.Text strong style={{ marginLeft: "10px" }}>Выбранные теги: </Typography.Text>
            )}
            {selectedTags.map(selectedTag => (
                <Tag
                    key={selectedTag}
                    closable
                    onClose={() => handleTagChange(selectedTag, false)}
                    style={{ margin: '5px' }}
                >
                    {selectedTag}
                </Tag>
            ))}

        </Layout.Content>
    );
};

export default GamesFilter;
