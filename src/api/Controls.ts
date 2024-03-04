import { folder as levaFolder } from 'leva'
import { Schema } from 'leva/dist/declarations/src/types'

type Folder = 'Performance' | 'Camera' | 'World' | 'PostProcessing'
type FolderOrders = Record<Folder, number>

class Controls<S extends Schema> {
  private static readonly ORDERS: FolderOrders = {
    Performance: 0,
    Camera: 1,
    World: 2,
    PostProcessing: 3,
  }
  private folder: Folder
  private controls: S

  constructor(folder: Folder, controls: S) {
    this.folder = folder
    this.controls = controls
  }

  public static create<S extends Schema>(folder: Folder, controls: S) {
    return new Controls(folder, controls)
  }

  public static folder<S extends Schema>(folder: Folder, name: string, controls: S) {
    return Controls.create(folder, {
      [name]: levaFolder(controls, { collapsed: true }),
    })
  }

  public static bool(value: boolean) {
    return value
  }

  public static num(value: number, min = 0, max = 1, step = 0.01) {
    return { value, min, max, step }
  }

  public static color(value: string) {
    return { value }
  }

  public static select<T>(value: T, options: T[] | Record<string, T>) {
    return { value, options }
  }

  public get() {
    const folderSettings = { collapsed: true, order: Controls.ORDERS[this.folder] }
    return [this.folder, this.controls, folderSettings] as const
  }

  public getFn() {
    const folderSettings = { collapsed: true, order: Controls.ORDERS[this.folder] }
    return [this.folder, () => this.controls, folderSettings] as const
  }
}

export default Controls
