interface TableOptionsDto {
    filters: {
        [key: string]: string | string[] | number | number[] | boolean;
    };
}

export default TableOptionsDto;
