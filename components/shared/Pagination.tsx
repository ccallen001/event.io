'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { formUrlQuery } from '@/lib/utils';

type PaginationProps = {
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
};

function Pagination({ urlParamName, page, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleBtnClick(btnType: 'prev' | 'next') {
    const pageValue = btnType === 'prev' ? Number(page) - 1 : Number(page) + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || 'page',
      value: pageValue.toString()
    });

    router.push(newUrl, { scroll: false });
  }

  return (
    <div className="flex gap-2">
      <Button
        className="w-28"
        variant="outline"
        size="lg"
        disabled={page === 1}
        onClick={() => handleBtnClick('prev')}
      >
        Prev
      </Button>

      <Button
        className="w-28"
        variant="outline"
        size="lg"
        disabled={Number(page) === totalPages}
        onClick={() => handleBtnClick('next')}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
