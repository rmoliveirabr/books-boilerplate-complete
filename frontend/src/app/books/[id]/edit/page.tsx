import { updateBook } from '@/actions/book/update-book'
import CreateBookForm from '@/components/books/book-form';

// import { useTranslation } from 'react-i18next'

// TODO: remove later
export default async function UpdateBook({ params }: { params: { id: string } }) {
    // const { t } = useTranslation()
    const messages = {
      toastSuccess: 'Sucesso', //t('companies:createCompany:titleSuccess'),
      toastSuccessDescription: 'Atualizou com sucesso', //t('companies:createCompany:descriptionSuccess'),
      toastError: 'Erro', //t('companies:createCompany:titleError'),
      toastErrorDescription: 'Não atualizou por erro', //t('companies:createCompany:descriptionError')  
    };

    return (
      <main>
        REMOVE-ME
          {/* <CreateBookForm action={updateBook} messages={messages} isEditPage={true} bookId={params.id}/> */}
      </main>
  );
}