import { MenuPermission } from 'src/model/group-menu/entities/group-menu.binding.entity';
import { GroupMenuEntity } from 'src/model/group-menu/entities/group-menu.entity';

const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const symbol = '!@#$%^&*()_+[]{}|;:,.<>?';
const number = '0123456789';
const randomLength = 20;

export function generateRandomString(
    length = randomLength,
    includeNumber = true,
    includeSymbol = true
): string {
    let randomString = '';
    let source = charset;
    if (includeNumber) {
        source = source + number;
    }
    if (includeSymbol) {
        source = source + symbol;
    }
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * source.length);
        randomString += source.charAt(randomIndex);
    }

    return randomString;
}

export function verifyPermission(groupMenu: GroupMenuEntity, menu: string, action: MenuPermission) {
    if (groupMenu) {
        console.log(groupMenu);
        let targetMenu = groupMenu.bindings.find(
            (binding) => binding.menu.menuName?.toLowerCase() === menu.toLowerCase()
        );
        if (targetMenu) {
            if (targetMenu.permissions.includes(action)) {
                return true;
            }
        }
    }
    return false;
}
