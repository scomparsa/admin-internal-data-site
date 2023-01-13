import { useCallback } from 'react'

export const usePagination = ({ pageInfo, refetch }) => {
  const { offset = 0, limit = 0, totalCount = 0 } = pageInfo || {}

  const opts = {
    total: totalCount,
    pageSize: limit,
    showSizeChanger: false,
    showQuickJumper: true,
    current: offset / limit + 1,
    showTotal: useCallback(total => `共 ${total} 条`, [totalCount])
  }

  if (refetch) {
    opts.onChange = page => {
      const offset = (page - 1) * limit
      refetch({ offset })

      if (typeof window !== 'undefined') window.scrollTo(0, 0)
    }
  }

  return opts
}
