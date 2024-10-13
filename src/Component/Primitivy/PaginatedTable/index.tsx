import { SpanContext } from '@/Component/Sections/Inquilinos/styles';
import React, { useState } from 'react';

type SortField<T> = keyof T;

interface PaginatedFilteredTableProps<T> {
    data: T[];
    columns: { key: SortField<T>; label: string }[];
    filterFields: (keyof T)[];
    renderRow: (item: T, index: number) => React.ReactNode;
    itemsPerPageOptions?: number[];
    defaultItemsPerPage?: number;
}

export default function PaginatedFilteredTable<T extends { [key: string]: any }>({
    data,
    columns,
    filterFields,
    renderRow,
    itemsPerPageOptions = [5, 10, 20],
    defaultItemsPerPage = 10,
}: PaginatedFilteredTableProps<T>) {
    const [itemsPerPage, setItemsPerPage] = useState<number>(defaultItemsPerPage);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filterTerm, setFilterTerm] = useState('');
    const [sortField, setSortField] = useState<SortField<T> | null>(null);

    const handleItemsPerPageChange = (newLimit: number) => {
        setItemsPerPage(newLimit);
        setCurrentPage(1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleFilter = (items: T[]) => {
        const term = filterTerm.toLowerCase();
        return items.filter(item =>
            filterFields.some(field => {
                const value = item[field];
                return typeof value === 'string' && value.toLowerCase().includes(term);
            })
        );
    };

    const handleSort = (items: T[]) => {
        if (!sortField) return items;

        return [...items].sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            return typeof aValue === 'string' && typeof bValue === 'string'
                ? aValue.localeCompare(bValue)
                : 0;
        });
    };

    const filteredData = handleFilter(data);
    const sortedData = handleSort(filteredData);
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = sortedData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <SpanContext>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex justify-between mb-4 gap-5 p-4">
                    <input
                        type="text"
                        placeholder="Pesquisar por nome ou CPF..."
                        value={filterTerm}
                        onChange={(e) => setFilterTerm(e.target.value)}
                        className="p-2 border border-gray-300 rounded bg-blue-50 w-100"
                    />
                    <div className="flex space-x-2">
                        {columns
                            .filter(({ key }) => key !== 'description' && key !== 'observacoes' && key !== 'cpfvisitante' && key !== 'cpfinquilinopermissao')
                            .map(({ key, label }) => (
                                <button
                                    key={String(key)}
                                    onClick={() => setSortField(key)}
                                    className={`p-1 border rounded text-center ${sortField === key ? 'bg-blue-500 text-white font-medium' : 'bg-blue-100 border-gray-300 text-gray-700'
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            {columns.map(({ key, label }) => (
                                <th key={String(key)} className="px-6 py-3">
                                    {label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => renderRow(item, index))}
                    </tbody>
                </table>
                <div className="mt-4 flex justify-between items-center p-4 gap-10">
                    <div className="flex items-center gap-4">
                        <span>Itens por página:</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                            className="p-2 border border-gray-300 rounded"
                        >
                            {itemsPerPageOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className="p-2 border rounded bg-blue-100 border-gray-300 text-gray-700"
                        >
                            Anterior
                        </button>
                        <span className="px-4">
                            Página {currentPage} de {totalPages}
                        </span>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="p-2 border rounded bg-blue-100 border-gray-300 text-gray-700"
                        >
                            Próxima
                        </button>
                    </div>
                </div>
            </div>
        </SpanContext>
    );
}
