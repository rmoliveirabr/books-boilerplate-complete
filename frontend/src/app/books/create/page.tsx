// import { useTranslation } from 'react-i18next'
import { createBook } from '@/actions/book/create-book'
import CreateBookForm from '@/components/books/book-form';

// TODO: remove later
export default async function CreateBook() {
    // const { t } = useTranslation()
    const messages = {
      toastSuccess: 'Sucesso', //t('companies:createCompany:titleSuccess'),
      toastSuccessDescription: 'Criou com sucesso', //t('companies:createCompany:descriptionSuccess'),
      toastError: 'Erro', //t('companies:createCompany:titleError'),
      toastErrorDescription: 'Não criou por erro', //t('companies:createCompany:descriptionError')  
    };

    return (
        <main>
            REMOVE-ME
            {/* <CreateBookForm action={createBook} messages={messages} /> */}
        </main>
    );
}
