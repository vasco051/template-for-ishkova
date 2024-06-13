import {useSearchParams} from 'react-router-dom';
import {useFormik} from 'formik';

import {TextField} from 'components/ui-kit/text-fields';
import {Button} from 'components/ui-kit/buttons';

import styles from './SearchPanel.module.scss'

export const SearchPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const formik = useFormik({
    initialValues: {
      name: searchParams.get('name_like') ?? ''
    },
    onSubmit: values => {
      if (values.name) searchParams.set('name_like', values.name)
      else searchParams.delete('name_like')

      setSearchParams(searchParams)
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className={styles.searchPanel}>
      <TextField id="name" value={formik.values.name} onChange={formik.handleChange} placeholder="Часы AGELOCER..."/>
      <Button type="submit">Поиск</Button>
    </form>
  )
}