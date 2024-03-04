import useStore from '@/api/store'

function useFluid() {
  const fluid = useStore(state => state.fluid)

  return [fluid?.tFluid ?? null, fluid?.tFluidMask ?? null] as const
}

export default useFluid
