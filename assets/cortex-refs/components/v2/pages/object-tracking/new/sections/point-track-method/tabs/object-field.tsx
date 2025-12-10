import { ControlledComboboxField } from '@/components/v2/inputs/controlled-combobox';
import { useObjectOptions } from '@/hooks/queries/campaignQuery';
import { useDebouncedState } from '@/hooks/useDebouncedState';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useFormContext } from 'react-hook-form';
import { NORAD_ID_TRANSFORMER } from '../../../transformers/transformers';
import { NewObjectTrackingFormData } from '../../../types';

const INITIAL_PAGINATION_PARAMS = { limit: 20, offset: 0 };

const ObjectField = () => {
  const { control } = useFormContext<NewObjectTrackingFormData>();
  const {
    value: search,
    setValue: setSearch,
    debouncedValue: debouncedSearch,
  } = useDebouncedState('');

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useObjectOptions({
      ...INITIAL_PAGINATION_PARAMS,
      search: debouncedSearch,
    });

  const { setLoadMoreRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  return (
    <ControlledComboboxField
      control={control}
      name="trackMethod"
      label="Object Name or ID"
      placeholder="Input an Object Name or ID"
      inputSize="l"
      type="number"
      labelClassName="typography-body-sm text-foreground"
      className="max-w-85"
      transform={NORAD_ID_TRANSFORMER}
      options={data || []}
      search={search}
      loadMoreElement={
        <div ref={(node) => setLoadMoreRef(node)} className="h-px w-full" />
      }
      isLoading={isFetching}
      isLoadingNextPage={isFetchingNextPage}
      onSearchChange={setSearch}
    />
  );
};

export default ObjectField;
