#include <stdio.h>
#include <mpi.h>

int main(int argc, char* argv[])
{
    int proceso;
    int total;

    MPI_Init (&argc, &argv);
    MPI_Comm_size(MPI_COMM_WORLD, &total);
    MPI_Comm_rank (MPI_COMM_WORLD, &proceso);

    printf("Hola mundo so el proceso: %d de %d\n", proceso,total) ;
}