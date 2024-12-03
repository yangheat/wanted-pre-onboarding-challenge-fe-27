/*
  sort (string, optional): 정렬 기준 (createdAt, updatedAt, priority)
  order (string, optional): 정렬 순서 (asc 또는 desc)
  priorityFilter (string, optional): 우선순위 필터링 (urgent, normal, low)
  keyword (string, optional): 제목 또는 내용에서 검색할 키워드
  countOnly (boolean, optional): true로 설정하면 할 일의 개수만 반환 
*/

import { useState } from "react"

const currentURL = new URL(location.href);
const params = new URLSearchParams(currentURL.search)

function setQueryString(key: string, value: string) {
  params.set(key, value);
  currentURL.search = params.toString();
  window.history.pushState({}, '', currentURL.toString());
}

function Sort() {
  const [sort, setSort] = useState('')

  function handleSortChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setSort(value)
    setQueryString('sort', value)
  }

  return (
    <section>
          <label htmlFor="createdAt">생성일</label>
          <input type="radio" name="sort" value="createdAt" checked={sort === 'createdAt'} onChange={handleSortChange} />
          <label htmlFor="updatedAt">수정일</label>
          <input type="radio" name="sort" value="updatedAt" checked={sort === 'updatedAt'} onChange={handleSortChange}/>
          <label htmlFor="priority">우선순위</label>
          <input type="radio" name="sort" value="priority" checked={sort === 'priority'} onChange={handleSortChange}/>
      </section>
  )
}

function Order() {
  const [order, setOrder] = useState('')

  function handleOrderChange(e: React.ChangeEvent<HTMLInputElement>) {
    setOrder(e.target.value)
    setQueryString('order', e.target.value)
  }

  return (
    <section>
      <label htmlFor="order">정렬순서</label>
      <input type="radio" name="order" value="asc" checked={order === 'asc'} onChange={handleOrderChange} />
      <label htmlFor="desc">내림차순</label>
      <input type="radio" name="order" value="desc" checked={order === 'desc'} onChange={handleOrderChange} />
    </section>
  ) 
}

function PriorityFilter() {
  const [priorityFilter, setPriorityFilter] = useState('')

  function handlePriorityFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPriorityFilter(e.target.value)
    setQueryString('priorityFilter', e.target.value)
  }

  return (
    <section>
      <input type="radio" name="priorityFilter" value="urgent" checked={priorityFilter === 'urgent'} onChange={handlePriorityFilterChange} />
      <label htmlFor="normal">보통</label>
      <input type="radio" name="priorityFilter" value="normal" checked={priorityFilter === 'normal'} onChange={handlePriorityFilterChange} />
      <label htmlFor="low">낮음</label>
      <input type="radio" name="priorityFilter" value="low" checked={priorityFilter === 'low'} onChange={handlePriorityFilterChange} />
    </section>
  )
}

function Keyword() {
  const [keyword, setKeyword] = useState('')

  function handleKeywordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value)
    setQueryString('keyword', e.target.value)
  }

  return (
    <section>
      <input type="search" name="keyword" value={keyword} onChange={handleKeywordChange} />
    </section>
  )
}

function CountOnly() {
  const [countOnly, setCountOnly] = useState(false)

  function handleCountOnlyChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCountOnly(e.target.checked)
    setQueryString('countOnly', e.target.checked.toString())
  }

  return (
    <section>
      <label htmlFor="countOnly">할 일 개수만 반환</label>
      <input type="checkbox" name="countOnly" checked={countOnly} onChange={handleCountOnlyChange} />
    </section>
  )
}

export default function TodoFilter() {
  return (
    <>
      <Sort />
      <Order />
      <PriorityFilter />
      <Keyword />
      <CountOnly />
    </>
  )
}