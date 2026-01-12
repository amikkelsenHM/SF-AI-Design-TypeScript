import { default as React } from 'react';

export type IconName = 'add' | 'add_circle' | 'arrow_back' | 'arrow_down' | 'arrow_downward' | 'arrow_forward' | 'arrow_up' | 'arrow_upward' | 'box_minus' | 'box_plus' | 'calendar_month' | 'cancel' | 'check' | 'check_circle' | 'chevron_down' | 'chevron_left' | 'chevron_right' | 'chevron_up' | 'close' | 'close_fullscreen' | 'copy' | 'delete' | 'download' | 'edit' | 'filter_list' | 'globe' | 'grid_off' | 'grid_on' | 'help' | 'info' | 'logout' | 'map' | 'menu' | 'more_vert' | 'open_in_full' | 'open_in_new' | 'pause' | 'play_arrow' | 'print' | 'refresh' | 'remove' | 'satellite' | 'search' | 'settings' | 'sort' | 'star' | 'star_filled' | 'swap_horiz' | 'sync' | 'warning_circle' | 'warning_tri' | 'freeview';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName;
    size?: number | string;
    color?: string;
}
export declare const Icon: React.FC<IconProps>;
export default Icon;
//# sourceMappingURL=Icon.d.ts.map